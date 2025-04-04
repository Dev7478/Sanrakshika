// Generate a random key
export const generateKey = async (length = 32) => {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Encrypt data
export const encrypt = async (data, key) => {
  try {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(JSON.stringify(data));
    
    const cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      encoder.encode(key),
      { name: 'AES-GCM' },
      false,
      ['encrypt']
    );
    
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      cryptoKey,
      encodedData
    );
    
    const encryptedArray = new Uint8Array(encryptedData);
    const resultArray = new Uint8Array(iv.length + encryptedArray.length);
    resultArray.set(iv);
    resultArray.set(encryptedArray, iv.length);
    
    return btoa(String.fromCharCode(...resultArray));
  } catch (error) {
    console.error('Error encrypting data:', error);
    throw error;
  }
};

// Decrypt data
export const decrypt = async (encryptedData, key) => {
  try {
    const decoder = new TextDecoder();
    const encryptedArray = new Uint8Array(
      atob(encryptedData)
        .split('')
        .map(char => char.charCodeAt(0))
    );
    
    const iv = encryptedArray.slice(0, 12);
    const data = encryptedArray.slice(12);
    
    const cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(key),
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    );
    
    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      cryptoKey,
      data
    );
    
    return JSON.parse(decoder.decode(decryptedData));
  } catch (error) {
    console.error('Error decrypting data:', error);
    throw error;
  }
};

// Hash data
export const hash = async (data) => {
  try {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', encodedData);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  } catch (error) {
    console.error('Error hashing data:', error);
    throw error;
  }
};

// Generate HMAC
export const generateHMAC = async (data, key) => {
  try {
    const encoder = new TextEncoder();
    const cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      encoder.encode(key),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const signature = await window.crypto.subtle.sign(
      'HMAC',
      cryptoKey,
      encoder.encode(data)
    );
    
    return btoa(String.fromCharCode(...new Uint8Array(signature)));
  } catch (error) {
    console.error('Error generating HMAC:', error);
    throw error;
  }
};

// Verify HMAC
export const verifyHMAC = async (data, key, signature) => {
  try {
    const encoder = new TextEncoder();
    const cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      encoder.encode(key),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    const signatureArray = new Uint8Array(
      atob(signature)
        .split('')
        .map(char => char.charCodeAt(0))
    );
    
    return await window.crypto.subtle.verify(
      'HMAC',
      cryptoKey,
      signatureArray,
      encoder.encode(data)
    );
  } catch (error) {
    console.error('Error verifying HMAC:', error);
    throw error;
  }
};

// Generate key pair
export const generateKeyPair = async () => {
  try {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256'
      },
      true,
      ['encrypt', 'decrypt']
    );
    
    const publicKey = await window.crypto.subtle.exportKey('spki', keyPair.publicKey);
    const privateKey = await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey);
    
    return {
      publicKey: btoa(String.fromCharCode(...new Uint8Array(publicKey))),
      privateKey: btoa(String.fromCharCode(...new Uint8Array(privateKey)))
    };
  } catch (error) {
    console.error('Error generating key pair:', error);
    throw error;
  }
};

// Encrypt with public key
export const encryptWithPublicKey = async (data, publicKey) => {
  try {
    const encoder = new TextEncoder();
    const keyData = new Uint8Array(
      atob(publicKey)
        .split('')
        .map(char => char.charCodeAt(0))
    );
    
    const cryptoKey = await window.crypto.subtle.importKey(
      'spki',
      keyData,
      {
        name: 'RSA-OAEP',
        hash: 'SHA-256'
      },
      false,
      ['encrypt']
    );
    
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: 'RSA-OAEP'
      },
      cryptoKey,
      encoder.encode(JSON.stringify(data))
    );
    
    return btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
  } catch (error) {
    console.error('Error encrypting with public key:', error);
    throw error;
  }
};

// Decrypt with private key
export const decryptWithPrivateKey = async (encryptedData, privateKey) => {
  try {
    const decoder = new TextDecoder();
    const keyData = new Uint8Array(
      atob(privateKey)
        .split('')
        .map(char => char.charCodeAt(0))
    );
    
    const cryptoKey = await window.crypto.subtle.importKey(
      'pkcs8',
      keyData,
      {
        name: 'RSA-OAEP',
        hash: 'SHA-256'
      },
      false,
      ['decrypt']
    );
    
    const data = new Uint8Array(
      atob(encryptedData)
        .split('')
        .map(char => char.charCodeAt(0))
    );
    
    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: 'RSA-OAEP'
      },
      cryptoKey,
      data
    );
    
    return JSON.parse(decoder.decode(decryptedData));
  } catch (error) {
    console.error('Error decrypting with private key:', error);
    throw error;
  }
}; 