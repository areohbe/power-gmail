declare global {
  export interface SelectOption {
    text: string;
    value: string;
  }

  export interface Shortcut {
    key: string;
    filterId: string;
    sender: string;
  }

  export interface Filter {
    id?: string;
    name: string;
    query: string;
    readable: string;
    sender?: string;
    key?: string;
  }

  export interface Sender {
    name: string;
    filters: Filter[];
  }

  export interface Database {
    senders: Sender[];
  }

  export interface SyncOptions {
    [key: string]: string;
  }
}
export {};
