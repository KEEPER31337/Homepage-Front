import React from "react"
import testImg from "../../assets/img/libraryImg/example.png"
import './font.css'
const RecommendBook = (props) => {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <input
            style={{ width: '500px', height: '50px', marginTop: 50 }}
          ></input>
          <div
            style={{
              height: '50px',
              marginTop: 50,
              width: '120px',
              backgroundColor: 'white',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <button
              className="font"
              style={{
                width: '100px',
                height: '35px',
                backgroundColor: '#FEE440',
                borderRadius: 5,
                boxShadow: '2px 2px 5px 2px #0000001A',
                color: 'black',
              }}
            >
              <div
                style={{
                  fontSize: 15,
                  marginTop: 'auto',
                  marginBottom: 'auto',
                }}
              >
                검색하기
              </div>
            </button>
          </div>
        </div>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '400px',
            paddingLeft: '20px',
            paddingRight: '20px',
            justifyContent: 'center',
          }}
        >
          <img
            src={testImg}
            style={{
              boxShadow: '2px 2px 5px 2px #0000001A',
              width: '240px',
              height: '320px',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 50,
              marginBottom: 'auto',
            }}
          >
            <div
              className="fontBold"
              style={{
                marginLeft: 20,
                textShadow: '0px 0px 74px 0px #0000001A',
                fontSize: '35px',
                color: 'white',
                textAlign: 'start',
                width: 500,
              }}
            >
              모던자바스크립트 Deep Dive
            </div>
            <div
              className="fontBold"
              style={{
                marginLeft: 20,
                textShadow: '0px 0px 74px 0px #0000001A',
                fontSize: '20px',
                color: 'white',
                textAlign: 'start',
              }}
            >
              by 이응모
            </div>
            <div
              className="font"
              style={{
                marginLeft: 20,
                textShadow: '0px 0px 74px 0px #0000001A',
                fontSize: '15px',
                color: 'white',
                textAlign: 'start',
                marginTop: 10,
                width: 500,
              }}
            >
              『모던 자바스크립트 Deep Dive』에서는 자바스크립트를 둘러싼 기본
              개념을 정확하고 구체적으로 설명하고, 자바스크립트 코드의 동작
              원리를 집요하게 파헤친다. 따라서 여러분이 작성한 코드가 컴퓨터
              내부에서 어떻게 동작할 것인지 예측하고, 명확히 설명할 수 있도록
              돕는다. 또한 최신 자바스크립트 명세를 반영해 안정적이고 효율적인
              코드를 작성할 수 있는 기본기를 다지고, 실전에서 쓰이는 모던
              자바스크립트 프레임워크나 도구를 완벽하게 이해하고 활용할 수 있게
              도와준다.
            </div>
            <div
              className="font"
              style={{
                marginLeft: 20,
                marginTop: 20,
                display: 'flex',
                borderRadius: 5,
                backgroundColor: '#FEE440',
                width: 100,
                height: 40,
                color: 'black',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '2px 2px 5px 2px #0000001A',
              }}
            >
              대여하기
            </div>
          </div>
        </div>
      </div>
    );
}
export default RecommendBook;