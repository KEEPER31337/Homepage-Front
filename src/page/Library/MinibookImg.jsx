import mini_book from '../../assets/img/libraryImg/mini_book.png';
import mini_book_empty from '../../assets/img/libraryImg/mini_book_empty.png';

const MinibookImg = ({ isEnable }) => {
  return (
    <>
      {isEnable ? (
        <img src={mini_book} className="h-8 w-7"></img>
      ) : (
        <img src={mini_book_empty} className="h-8 w-7"></img>
      )}
    </>
  );
};
export default MinibookImg;
