import Video from "../models/Video";

const handleSearch = (error, videos) => {
  console.log("error", error);
  console.log("videos:", videos);
}


export const home = async (req, res) => {
  // Video.find({}, handleSearch);
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos : videos});
};
export const watch = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const video = await Video.findById(id);
  console.log(video);
    return res.render("watch", {video});
  // const video = await Video.findById(id);
  // console.log(video);
  // return res.render("watch", { pageTitle: `Watching: `}, video);
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  return res.render("edit", { pageTitle: `Editing:`, video});
};
export const postEdit = (req, res) => {
  const {id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle : "Upload Video"});
}

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body
    await Video.create({
    title,
    description,
    createAt: Date.now(),
    hashtags: hashtags
      .split(",")
      .map((word) => (word.startsWith("#") ? word : `#${word}`)),
    meta : {
      views: 0,
      rating: 0
    }
  });
  return res.redirect("/");
}