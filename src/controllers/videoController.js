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
  if (!video) {
    return res.render("404", { pageTitle: "Video not found"});
  }
  console.log(video);
    return res.render("watch", {video});
  // const video = await Video.findById(id);
  // console.log(video);
  // return res.render("watch", { pageTitle: `Watching: `}, video);
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video not found"});
  }
  return res.render("edit", { pageTitle: `Editing:`, video});
};
export const postEdit = async (req, res) => {
  const {id} = req.params;
  const {title, description, hashtags} = req.body;
  await Video.findByIdAndUpdate( id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags)

  })
  console.log("edit post");
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
    hashtags: Video.formatHashtags(hashtags),
    meta : {
      views: 0,
      rating: 0
    }
  });
  return res.redirect("/");
}