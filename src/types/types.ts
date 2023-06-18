interface IBook {
  id?: number;
  title: string;
  description: string;
  author: number;
  pages?: IPage[];
}

interface IPage {
  id?: number;
  chapter: string;
  content: string;
  book: number;
}

interface ICelebrity {
  id?: number;
  name: string;
  text: string;
}
