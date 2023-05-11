export const validateFunc = (focus: boolean | undefined, regExp: RegExp, text: string) => {
  return !focus ? regExp.test(text) : true;
};

export const changeBorderColor = (
  focus: boolean | undefined,
  regExp: RegExp,
  text: string,
  classes: Record<string, string>,
  startChangeProfile?: boolean
) => {
  if (focus === undefined) return '';
  if (startChangeProfile !== undefined && text.length === 0) return '';
  if (!focus) {
    return text.length === 0 || !regExp.test(text) ? `${classes.errorBorder}` : '';
  }

  return '';
};

export const validatePassword = (flag: 'str' | 'num' | 'leng', text: string, classes: Record<string, string>) => {
  if (flag === 'leng') return text.length >= 8 ? '' : `${classes.errorText}`;

  const reg = flag === 'str' ? /(?=.*[A-Z])[A-Z]/ : /\d/;

  if (!text.length) return '';

  return reg.test(text) ? '' : `${classes.errorText}`;
};

export const validateLogin = (flag: 'str' | 'num', text: string, classes: Record<string, string>) => {
  const reg = flag === 'str' ? /[a-z]/i : /\d/;

  if (!text.length) return '';

  return reg.test(text) ? '' : classes.errorText;
};
