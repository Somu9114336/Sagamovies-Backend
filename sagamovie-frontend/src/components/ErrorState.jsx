function ErrorState({ message, action }) {
  return (
    <div className="rounded-3xl border border-rose-400/20 bg-rose-500/10 p-6 text-rose-100">
      <p className="text-lg font-semibold">Something went wrong</p>
      <p className="mt-2 text-sm text-rose-100/80">{message}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export default ErrorState;
