import { useModal } from "../../hooks/useModal";
import ModalButton from "../Modal";
import Slider, { IMG_BOX, IMG_BOX_MODAL, IMG_BOX_NORMAL } from "../ui/Slider";

interface Props {
  images: string[];
  count: number;
}
export default function PostImage({ images, count = 0 }: Props) {
  const [isModalOpen, setModal] = useModal();
  return (
    <>
      <div className={IMG_BOX}>
        <img
          src={images[count]}
          alt="포스트 이미지"
          className="object-contain bg-black w-full h-full"
          onClick={() => setModal(true)}
        />
      </div>
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
