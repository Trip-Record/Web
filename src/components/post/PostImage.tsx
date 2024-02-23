import { useModal } from "../../hooks/useModal";
import ModalButton from "../Modal";
import PostImage from "../ui/PostImage";
import Slider from "../ui/Slider";

interface Props {
  images: string[];
  count: number;
}
export default function ModalImage({ images, count = 0 }: Props) {
  const [isModalOpen, setModal] = useModal();
  return (
    <>
      <PostImage image={images[count]} onClick={() => setModal(false)} />
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
