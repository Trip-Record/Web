interface RadioValue {
  image: string;
  title: string;
  subtitle?: string;
}
interface Props {
  valueList: Array<RadioValue>;
  setSelect?: (title: string) => void;
  hiddnTitle?: boolean;
  className?: string;
}
export default function Radios({
  valueList,
  setSelect,
  hiddnTitle = false,
  className = "",
}: Props) {
  return (
    <>
      {valueList.map(({ image, subtitle, title }) => (
        <div key={title} className={className}>
          <input
            type="radio"
            name="styleToggle"
            id={title}
            className="w-full peer hidden"
            value={title}
            onChange={() => {
              if (setSelect) setSelect(title);
            }}
          />
          <label
            key={title}
            htmlFor={title}
            className="flex flex-col items-center rounded-md p-2 border border-white hover:border-black/20 hover:shadow-md peer-checked:border peer-checked:bg-blue-50"
          >
            <div className="p-1 bg-blue-300 rounded-full w-20 h-20 flex items-center justify-center">
              <img src={image} alt="스타일" className="w-14 bg-blue-300" />
            </div>
            <div className="font-bold">{!hiddnTitle && title}</div>
            <div>{subtitle}</div>
          </label>
        </div>
      ))}
    </>
  );
}
