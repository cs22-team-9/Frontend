const initialState = {
  position: [0, 0],
  spriteLocation: '0px 0px',
  direction: 'SOUTH',
  walkIndex: 0,
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVE_PLAYER':
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default playerReducer;


// [ [0: {(6 , 8)}], [1: (7,8)]]