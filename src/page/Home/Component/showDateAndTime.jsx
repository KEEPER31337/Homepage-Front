export default function showDateAndTime(now, dateTimeString) {
    const dateTimeArrayOfPost = dateTimeString.split("T");

    const dateArrayOfPost = dateTimeArrayOfPost[0].split("-");
    const timeArrayOfPost = dateTimeArrayOfPost[1].split(":"); 
    
    const dateArrayOfNow = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
    const timeArrayOfNow = [now.getHours(), now.getMinutes(), now.getSeconds()]

    for (var i = 0; i < 3; i++) {
        if (dateArrayOfNow[i] != dateArrayOfPost[i]) {
            if (i == 0) {
                return <div> {dateArrayOfNow[0] - dateArrayOfPost[0]}년 전 </div>
            }

            else if (i == 1) {
                return <div> {dateArrayOfNow[1] - dateArrayOfPost[1]}개월 전 </div>
            }

            else if (i == 2) {
                return <div> {dateArrayOfNow[2] - dateArrayOfPost[2]}일 전 </div>
            }
        }
    }

    for (var i = 0; i < 3; i++) {
        if (timeArrayOfNow[i] != timeArrayOfPost[i]) {
            if (i == 0) {
                return <div> {timeArrayOfNow[0] - timeArrayOfPost[0]}시간 전 </div>
            }

            else if (i == 1) {
                return <div> {timeArrayOfNow[1] - timeArrayOfPost[1]}분 전 </div>
            }

            else if (i == 2) {
                return <div> {timeArrayOfNow[2] - timeArrayOfPost[2]}초 전 </div>
            }
        }
        else {
            if (i == 2) {
                return <div> 0초 전 </div>
            }
        }
    }

    return <div> timeError </div>;
}