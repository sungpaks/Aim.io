// Description: �����ν� ����� ����ϴ� �����Դϴ�.
const setVoiceRecogition = (onVoiceCommand) => {
	let recognition = new window.webkitSpeechRecognition();
	recognition.lang = "ko-KR";

	console.log("�����ν� ����");
	recognition.start();
	recognition.oned = () => {
		console.log("�� ������ ��");
		recognition.start();
	};
	recognition.onresult = (e) => {
		console.log(e.results);
	}
}

export default setVoiceRecogition;