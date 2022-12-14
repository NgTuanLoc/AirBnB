import moment from 'moment';

const transformLanguage = (str: string) => {
	str = str.toLowerCase();
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
	str = str.replace(/đ/g, 'd');
	str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
	str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
	str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
	str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
	str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
	str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
	str = str.replace(/Đ/g, 'D');
	return str;
};

const transformDate = (date: Date | string, type = '') => {
	if (!type) moment(date).format();
	if (typeof date === 'string') return moment(new Date(date)).format(type);
	return moment(date).format(type);
};

const mapOriginValueToFormInput = (key: string, originValue: string) => {
	let value: any = 'Not Provided';
	let inputType = 'text';

	if (typeof originValue === 'boolean') {
		value = originValue;
		inputType = 'checkbox';
	} else if (key === 'birthday') {
		value = new Date(originValue).toISOString().substring(0, 10);
		inputType = 'date';
	} else if (typeof originValue === 'number') {
		value = originValue ? originValue : 0;
		inputType = 'number';
	} else if (typeof originValue === 'string') {
		value = originValue ? originValue : 'Not Provided';
	}

	return { value, inputType };
};

const generateRandomIndex = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateRandomDate = (from: Date, to: Date) => {
	const fromTime = from.getTime();
	const toTime = to.getTime();
	return new Date(fromTime + Math.random() * (toTime - fromTime));
};

const isValidDate = (dateObject: string) =>
	new Date(dateObject).toString() !== 'Invalid Date';

export {
	transformLanguage,
	transformDate,
	mapOriginValueToFormInput,
	generateRandomIndex,
	generateRandomDate,
	isValidDate,
};
