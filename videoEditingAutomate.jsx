//~ var qe = app.enableQE();
//~ var qeProj = qe.project;
//~ var qeSource = qe.source;
//~ var qeSeq = qe.QESequence.name;



//~ var clipForEffect = qe.project.getActiveSequence().getVideoTrackAt(0).getItemAt(2);
//~ var transitionToApply = qe.project.getVideoTransitionByName("Dip to Black");
//~ var item = qe.project.getActiveSequence(0).getVideoTrackAt(0).getItemAt(2);
//~ item.addTransition(transitionToApply, false, '00:00:03:00');

//~ var item = qe.project.getActiveSequence().getVideoTrackAt(0).getItemAt(2);
//~ var clipToBeDelete = qe.project.getActiveSequence().getVideoTrackAt(0).getItemAt(2);
//~ var clipToBeDelete = qe.project.getItemAt(1);
//~ alert(clipToBeDelete.toString());


//~ var clip;
//~ alert(qeSeq.name);

app.enableQE();

var source_path = "E:\\VideoEditingProject\\saidul\\advertisement\\source\\testVids\\";
var advertisement_start = 0;
var intro_vid_duration = 15;
var blog_vid_duration = 254;
var audio_start = 15;
var reference_gap = 25;
var blog_vid_start = intro_vid_duration;
var outro_vid_start = intro_vid_duration + blog_vid_duration;
var total_reference = 11;


var file_advertisement = source_path + "advertisement.mp4";
var file_intro = source_path + "intro.mp4";
var file_blog = source_path + "blog.mp4";
var file_outro = source_path + "outro.mp4";
var file_mp3 = source_path + "audio.mp3";


var referenceFiles = [];
for (var i = 1; i <= total_reference; i++) {
    var referenceFileName = "reference" + i + ".mp4";
    referenceFiles.push(source_path + referenceFileName);
}
app.project.importFiles(referenceFiles);
app.project.importFiles([file_advertisement, file_intro, file_blog, file_outro, file_mp3]);

var project = app.project;
var sequence = project.activeSequence;

var videoTrack0 = sequence.videoTracks[0];
var videoTrack1 = sequence.videoTracks[1];
var videoTrack2 = sequence.videoTracks[2];
var videoTrack3 = sequence.videoTracks[3];
var audioTrack0 = sequence.audioTracks[0];
var audioTrack1 = sequence.audioTracks[1];

var advertisementClip = findClipByName("advertisement.mp4");
if (advertisementClip) {
    videoTrack2.overwriteClip(advertisementClip, advertisement_start);
}

var introClip = findClipByName("intro.mp4");
if (introClip) {
    videoTrack0.overwriteClip(introClip, 0);
}

var blogClip = findClipByName("blog.mp4");
if (blogClip) {
    videoTrack0.overwriteClip(blogClip, blog_vid_start);
}

var outroClip = findClipByName("outro.mp4");
if (outroClip) {
    videoTrack0.overwriteClip(outroClip, outro_vid_start);
}

var clipForEffect = qe.project.getActiveSequence().getVideoTrackAt(0).getItemAt(2);
var transitionToApply = qe.project.getVideoTransitionByName("Dip to Black");
var item = qe.project.getActiveSequence(0).getVideoTrackAt(0).getItemAt(2);
item.addTransition(transitionToApply, false, '00:00:03:00');

var clipToBeDelete = qe.project.getActiveSequence().getVideoTrackAt(0).getItemAt(2);
clipToBeDelete.rippleDelete();



var audioClip = findClipByName("audio.mp3");
if (audioClip) {
    audioTrack1.overwriteClip(audioClip, audio_start);
}

app.project.sequences[0].audioTracks[0].setMute(1);
app.project.sequences[0].audioTracks[2].setMute(1);
app.project.sequences[0].audioTracks[3].setMute(1);

for (var i = 0; i < total_reference; i++) {
    var referenceName = "reference" + (i + 1) + ".mp4";
    var referenceClip = findClipByName(referenceName);
    if (referenceClip) {
        var counter = reference_gap * (i + 1);
        videoTrack1.overwriteClip(referenceClip, counter);
    }
}

function findClipByName(name) {
    var project = app.project;
    for (var i = 0; i < project.rootItem.children.numItems; i++) {
        var item = project.rootItem.children[i];
        if (item.type === ProjectItemType.CLIP && item.name === name) {
            return item;
        }
    }
    return null;
}


var addTime = new Time();
var refTime = new Time();
var introTime = new Time();
var blogTime = new Time();
var outroTime = new Time();
var audioTime = new Time();

var videoTracks = sequence.videoTracks;
var audioTracks = sequence.audioTracks;
var firstVideoTrack = videoTracks[0];

var allClipsFromFirstVideoTracks = firstVideoTrack.clips;
// var adVideoClip = allClipsFromFirstVideoTracks[0];
// var refVideoClip = allClipsFromFirstVideoTracks[0];
var introVideoClip = allClipsFromFirstVideoTracks[0];
var blogVideoClip = allClipsFromFirstVideoTracks[1];
var outroVideoClip = allClipsFromFirstVideoTracks[2];

// alert(introVideoClip.name);


//~ alert(thisClip.duration.seconds.toString ());
// alert(thisClip.start.seconds.toString ());
//~ alert(thisClip.end.seconds.toString ());
//~ alert(thisClip.inPoint.seconds.toString ());
//~ alert(thisClip.outPoint.seconds.toString ());
// blogTime.seconds = 25;
// thisClip.start = blogTime;

var time = new Time();
// var introVideoClipDuration = introVideoClip.duration.seconds;
blogVideoClip.start = 10;
blogVideoClip.end = 100;
// blogVideoClip.end = 100;

// var blogVideoClipDuration = blogVideoClip.duration.seconds;











// var seq = project.activeSequence;
// app.encoder.launchEncoder();
// var outputVid = "C:\\Users\\Video Editor R\\Desktop\\VidOut\\vid1.mp4";
// var myPreset = "C:\\Users\\Video Editor R\\Documents\\Adobe\\Adobe Media Encoder\\15.0\\Presets\\vid_render_1080_2024.epr";
// app.encoder.encodeSequence(seq, outputVid, myPreset, 0, 1);
// app.encoder.startBatch();




