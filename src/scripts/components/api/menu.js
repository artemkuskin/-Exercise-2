export const menu = async () => {
  let url = "http://localhost:7000/";
  let resp = await fetch(`${url}`);
  let result = await resp.json();
  let menu = result.menu;

  return menu;
};
