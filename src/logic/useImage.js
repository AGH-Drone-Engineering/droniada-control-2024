import { storage } from 'logic/fb';
import { ref, getDownloadURL } from 'firebase/storage';

export default async function (img) {
  return await getDownloadURL(ref(storage, "arucos/" + img))
}