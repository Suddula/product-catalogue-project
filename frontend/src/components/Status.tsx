export function Loading() { return <p className="status">Loading catalogue…</p>; }
export function ErrorMessage({ message }: { message: string }) { return <p className="error" role="alert">{message}</p>; }
