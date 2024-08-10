export const secretMode = new URLSearchParams(window.location.search).has('secretMode');
export const botSrc = secretMode ? `${process.env.PUBLIC_URL}/img/special_bot.png` : `${process.env.PUBLIC_URL}/img/bot.png`;
