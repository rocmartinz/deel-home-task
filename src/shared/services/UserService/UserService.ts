import { sleep } from "../../utils/Sleep/Sleep";

interface IUser {
  name: string;
}

const byName = (search: string) => (user: IUser): boolean => {
  const matchRegex = new RegExp(search, 'ig');
  return Boolean(user.name.match(matchRegex));
};

const toName = (user: IUser) => user.name;

const randomInterval = (): number => Math.random() * 1000;

export async function searchUsersByName(name: string): Promise<string[]> {
  if (!name) {
    return [];
  }

  const response = await fetch('./autocomplete.json').then(response => response.json()).catch(() => { });
  await sleep(randomInterval());
  if (!Array.isArray(response)) {
    return [];
  }

  const users = [...response] as IUser[];
  return users.filter(byName(name)).map(toName) || [];
}