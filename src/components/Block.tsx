import React from 'react';

const Block = () => {
  return (
    <span
      style={{
        position: 'absolute',
        top: '0',
        right: '0',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        backdropFilter: 'blur(5px)',
        textAlign: 'center',
        fontFamily: 'Arial',
      }}
    >
      У вас нет доступа к данному разделу. Пройдите тестирование предыдущего курса и попробуйте
      снова.
    </span>
  );
};

export default Block;
