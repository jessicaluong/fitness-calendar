type SquareProps = {
  color: string;
};

export default function Square({ color }: SquareProps) {
  return (
    <div
      className={`${color} w-[5px] h-[5px] rounded-[1px] md:w-[8px] md:h-[8px] md:rounded-[2px]`}
    ></div>
  );
}
