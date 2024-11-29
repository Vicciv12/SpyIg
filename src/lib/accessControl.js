// lib/accessControl.js

export function initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('accessControlDB', 1);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore('access', { keyPath: 'id' });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  export function setAccessTimestamp() {
    return initDB().then((db) => {
      const transaction = db.transaction('access', 'readwrite');
      const store = transaction.objectStore('access');
      store.put({ id: 'lastAccess', timestamp: new Date().getTime() });
    });
  }
  
  export function checkAccess() {
    return initDB().then((db) => {
      return new Promise((resolve) => {
        const transaction = db.transaction('access', 'readonly');
        const store = transaction.objectStore('access');
        const request = store.get('lastAccess');
  
        request.onsuccess = () => {
          const result = request.result;
          if (!result) {
            // Nenhum acesso registrado
            resolve(true);
          } else {
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - result.timestamp;
            const oneDay = 24 * 60 * 60 * 1000; // 24 horas em milissegundos
            resolve(timeDifference > oneDay); // Retorna true se o acesso é permitido
          }
        };
  
        request.onerror = () => resolve(false);
      });
    });
  }
  