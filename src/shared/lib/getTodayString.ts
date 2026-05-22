const getTodayString = () => new Date().toISOString().split('T')[0];
export default getTodayString;