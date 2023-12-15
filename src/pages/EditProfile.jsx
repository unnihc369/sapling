import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { UserState } from "../context/UserContext";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../Firebase";
import { ToastError, ToastSuccess, ToastWarning } from "../utility/Toasts";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {v4} from 'uuid'
export default function EditProfile() {
  const [name, SetName] = useState("");
  const [phone, SetPhone] = useState("");
  const [photo, SetPhoto] = useState("");
  const [about, SetAbout] = useState("");
  const [address, Setaddress] = useState("");
  const [ImageLoading, setImageLoading] = useState(false);
  const { user, setUser, setLoad, load } = UserState();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(user)
    if (user.name) {
      SetName(user.name);
    }
    if (user.phone) {
      SetPhone(user.phone);
    }
    if (user.about) {
      SetAbout(user.about);
    }
    if (user.address) {
      Setaddress(user.address);
    }
    if (user.photo) {
      SetPhoto(user.photo);
    }
  }, [user]);

  //  adding and editing user
  const updateUserProfile = async (e) => {
    e.preventDefault();
    if (!name || !phone || !about || !address) {
      return ToastWarning("enter All info");
    }

    if (!user.userId) {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          about: about,
          address: address,
          email: user.email,
          phone: phone,
          photoUrl:
            photo,
          userID: user.authId,
          username: name,
        });
        
          setLoad(!load);
          ToastSuccess("Your info updated successfull");
          navigate("/profile");
        
      } catch (error) {
        ToastError(error.message);
      }
    } else {
      try {
        const data = await updateDoc(doc(db, "users", user.userId), {
          about: about,
          address: address,
          phone: phone,
          photoUrl:
            photo,
          username: name,
        });
      
          setLoad(!load);
          ToastSuccess("Your info updated successfull");
          navigate("/profile");
        
      } catch (error) {
        ToastError(error.message);
      }
    }
  };


    const onChangeFIleUploadHandler = (File) => {
      if (File === null) return;

      if (File === undefined) return ToastWarning("plese select proper image!");
      setImageLoading(true);
      const blogRef = ref(storage, `userPhotos/${File.name + v4()}`);

      const uploadTask = uploadBytesResumable(blogRef, File);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          switch (snapshot.state) {
            case "paused":
              ToastError("upload paused");
              break;
            case "running":
              // ToastInfo("Running");
              console.log("running");
              break;
            default:
              break;
          }
        },
        (ere) => {
          ToastError(ere.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            ToastSuccess("Image upload successfull");
            // setProgress(null);
            SetPhoto((prev) => ({ ...prev, imageUrl: downloadUrl }));
            setImageLoading(false);
            
          });
        }
      );
    };
    console.log(photo)


  return (
    <form>
      <div className="space-y-12 p-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                    value={name}
                    onChange={(e) => {
                      SetName(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                  <input
                    type="number"
                    name="phone"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="phone Number"
                    value={phone}
                    onChange={(e) => {
                      SetPhone(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={about}
                  onChange={(e) => {
                    SetAbout(e.target.value);
                  }}
                />
              </div>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                address
              </label>
              <div className="mt-2">
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={address}
                  onChange={(e) => {
                    Setaddress(e.target.value);
                  }}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon
                  className="h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <input
                  type="file"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onChange={(e) => {
                    onChangeFIleUploadHandler(e.target.files[0]);
                  }}
                />
                <div className={`d-${ImageLoading?"flex":"none"} justify-content-center`} >
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={updateUserProfile}>Save</button>
          </div>
        </div>
      </div>
    </form>
  );
}
