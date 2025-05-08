export function MyButton({ sasa }: { sasa?: string }): any {
  const _foo = 123;

  return (
    <>
      <button validate className="text-base text-white px-4 py-2 rounded bg-blue-500" name="John" type="button">
        {sasa ?? 'Click me!'}
      </button>
      <Hello
        active
        validate
        className="text-xl bg-red/50"
        name="John"
        tel={5555555}
        onClick={() => {}}
        onSubmit={() => {}}
      />
    </>
  );
}

interface HelloProps {
  active: boolean;
  className: string;
  name: string;
  onClick: () => void;
  onSubmit: () => void;
  tel?: number;
  validate?: boolean;
}

function Hello({
  active, className, name, onClick, onSubmit,
  tel, validate,
}: HelloProps): any {
  return (
    <div className={className}>
      {active && (
        <p>
          Hello,
          {' '}
          {name}
          !
          {tel && (
            <span>
              {' '}
              Your phone number is:
              {tel}
            </span>
          )}
        </p>
      )}
      {validate && <p>Validation passed!</p>}
      <button type="button" onClick={onClick}>
        Click me!
      </button>
      <button type="submit" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
}
