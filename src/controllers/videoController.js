import Video from "../models/Video";

const handleSearch = (error, videos) => {
  console.log("error", error);
  console.log("videos:", videos);
}


export const home = async (req, res) => {
  // Video.find({}, handleSearch);
  console.log("start");
  const videos = await Video.find({});
  console.log(videos);
  console.log("finishied");
  return res.render("home", { pageTitle: "Home", videos : videos});
};
export const watch = (req, res) => {
  const { id } = req.params;
  return res.render("watch", { pageTitle: `Watching: `});
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing:`});
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
    hashtags: hashtags.split(",").map((word) => `#${word}`),
    meta : {
      views: 0,
      rating: 0
    }
  });
  return res.redirect("/");
}