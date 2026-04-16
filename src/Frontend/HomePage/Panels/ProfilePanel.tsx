import React, { useRef } from "react";
import { useAuth } from "../../Context/useAuth";
import NavBar from "../../NavBar";
function ProfilePanel() {
  const { user, login } = useAuth();

  const fileRef = useRef<HTMLInputElement | null>(null);

  const openFilePicker = () => {
    fileRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);

    console.log(file);
    console.log(imageUrl);

    if (user) {
      login({
        ...user,
        profilePicture: imageUrl,
      });
    }
  };

  if (!user)
    return (
      <>
        <NavBar />
        <p>No User is logged in</p>
      </>
    );

  return (
    <>
      <div>
        <NavBar />
        <main className="flex flex-col px-10 gap-10 h-full pt-10 w-full">
          <section className="flex justify-between px-10 h-fit">
            <div className="flex gap-2">
              <img
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "profilePicture.png"
                }
                alt=""
                className="rounded-full border-5 border-[#0a0202] h-50 w-auto aspect-square"
              />
              <a
                className="relative w-4 h-50 rounded-full cursor-pointer"
                onClick={openFilePicker}
              >
                <input
                  type="file"
                  ref={fileRef}
                  onChange={onFileChange}
                  accept="image/png, image/jpeg"
                  className="hidden bottom-0 -left-5 absolute w-8 h-8 z-10"
                />
                <div className="bg-[#CAFD00] rounded-full w-8 h-8 absolute bottom-0 -left-5 flex justify-center items-center">
                  <img
                    src="penIcon.png"
                    alt=""
                    className="h-4 w-4 object-cover"
                  />
                </div>
              </a>
              <div className="flex flex-col gap-4">
                <h2 className="font-black text-6xl text-white tracking-tighter">
                  {user.fullname.toUpperCase()}
                </h2>
                <span className="rounded-2xl bg-[#262626] px-3 text-xs py-1 w-fit text-[#F3FFCA]">
                  LEVEL 67
                </span>
                <p className="text-[#ADAAAA]">
                  Hybrid Athlete. Pushing the boundaries of human performance
                  through data-driven strength and endurance protocols.
                </p>
              </div>
            </div>
            <div className="h-full flex flex-col justify-end px-3">
              <h3 className="text-[#ADAAAA] text-l">MEMEBER SINCE</h3>
              <h2 className="text-[#F3FFCA] text-2xl font-extrabold">
                {user.createdAt.toString().split("T")[0]}
              </h2>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default ProfilePanel;
