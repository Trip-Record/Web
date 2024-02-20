import { useModal } from "../../hooks/useModal";
import ModalButton from "../Modal";
import Slider from "../ui/Slider";

interface Props {
  images: string[];
  count: number;
}
export default function PostImage({ images, count = 0 }: Props) {
  const [isModalOpen, setModal] = useModal();
  return (
    <>
      <img
        src={images[count]}
        alt="포스트 이미지"
        className="object-contain bg-black"
        onClick={() => setModal(true)}
      />
      <ModalButton
        key={images[count]}
        button={<></>}
        modal={
          <Slider images={images} count={count} onModal={true} key={count} />
        }
        isOpenModal={isModalOpen}
        setModal={setModal}
      />
    </>
  );
}
