export const uploadToCloudnary = async (file: any) => {
  const cloud_name = "ds4zgf8p4",
    upload_preset = "choice-bazaar";
  const url = `https://api.cloudinary.com/v1_1/${cloud_name}/upload`;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", upload_preset);
  data.append("cloud_name", cloud_name);

  const res = await fetch(url, {
    method: "POST",
    body: data,
  });

  const fileData = await res.json();
  console.log("image url", fileData);
  return fileData.url;
};
