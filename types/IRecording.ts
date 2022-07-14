export interface IRecording {
  readonly id: number | null;
  readonly createdTime: string;
  readonly date: string;
  name: string;
  nameLowerCase: string;
  description: string;
  authors: [string] | null;
  tags: [string] | null;
}
