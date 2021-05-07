/**
 * @param title Post title
 * @returns slugified title
 */
export default (title: string): string => {
  title = title.trim();
  title = title.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'åàáãäâèéëêìíïîıòóöôùúüûñçşğ·/_,:;';
  const to = 'aaaaaaeeeeiiiiioooouuuuncsg------';

  for (let i = 0, l = from.length; i < l; i++) {
    title = title.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  return title
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes
    .replace(/^-+/, '') // trim - from start of text
    .replace(/-+$/, '') // trim - from end of text
    .replace(/-/g, '-');
}