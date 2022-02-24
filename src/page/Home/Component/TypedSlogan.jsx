// Using typed.js for typing animation

import React from 'react';
import Typed from 'typed.js';

const TypedSlogan = () => {
	// Create reference to store the DOM element containing the animation
	const el = React.useRef(null);
    // Create reference to store the Typed instance itself
	const typed = React.useRef(null);

  React.useEffect(() => {
    const options = {
    	strings: [
            "'지키다'라는 의미를 가진 단어 'KEEP'에서 착안하여, \n 정보보호에 관한 연구를 진행하고 그 성과를 공유하기 위해 만들어진 동아리입니다."
        ],
        typeSpeed: 50,
    };
    
    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, options);
    
    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current.destroy();
    }
  }, [])

  return (
    <div onClick={() => typed.current.reset()}>
      <div className="type-wrap">
        <span style={{ whiteSpace: 'pre-line'}} ref={el} />
      </div>
    </div>
  );
}

export default TypedSlogan;