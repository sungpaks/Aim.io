// Description: 음성인식 기능을 담당하는 파일입니다.
const setVoiceRecogition = (onVoiceCommand) => {
	let recognition = new window.webkitSpeechRecognition();
	recognition.lang = "ko-KR";

	console.log("음성인식 시작");
	recognition.start();
	recognition.oned = () => {
		console.log("한 뭉팅이 끝");
		recognition.start();
	};
	recognition.onresult = (e) => {
		console.log(e.results);
	}
}

export default setVoiceRecogition;