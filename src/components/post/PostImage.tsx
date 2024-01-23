import { useModal } from "../../hooks/useModal";
import ModalButton from "../Modal";
import Slider from "../ui/Slider";

interface Props {
  image: string;
  count?: number;
}
export default function PostImage({ image, count = 0 }: Props) {
  const [isModalOpen, setModal] = useModal();

  const imgCount = count * -1;

  return (
    <>
      <img
        src={image}
        alt="포스트 이미지"
        className="object-contain p-2 bg-black"
        onClick={() => setModal(true)}
      />
      <ModalButton
        key={image}
        button={<></>}
        modal={
          <Slider
            images={[
              "/logo192.png",
              "/naverLogin.png",
              "/profile-icons/Cat.png",
            ]}
            count={imgCount}
            onModal={true}
            key={imgCount}
          />
        }
        isOpenModal={isModalOpen}
        setModal={setModal}
      />
    </>
  );
}
