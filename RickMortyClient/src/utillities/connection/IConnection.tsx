export interface IConnection {
    url: string;
    data?: any;
    key?: string;
    setData?: React.Dispatch<(prevState: undefined) => undefined>
}