app.enableQE();

var source_path = "D:\\VideoEditingProject\\saidul\\advertisement\\source\\testVids\\";
var outputVid = "C:\\Users\\Zihad LK\\Desktop\\Editing\\output";
var myPreset = "C:\\Users\\Zihad LK\\Documents\\Adobe\\Adobe Media Encoder\\23.0\\Presets\\vid_render_1080_2024.epr";
var advertisement_start = 0;
var intro_vid_duration = 15;
var blog_vid_duration = 584;
var audio_start = 15;
var reference_gap = 25;
var blog_vid_start = intro_vid_duration;
var outro_vid_start = intro_vid_duration + blog_vid_duration;
var total_reference = 11;
var refClipName = "ref";


var file_advertisement = source_path + "advertisement.mp4";
var file_intro = source_path + "intro.mp4";
var file_blog = source_path + "blog.mp4";
var file_outro = source_path + "outro.mp4";
var file_mp3 = source_path + "audio.mp3";


var referenceFiles = [];
for (var i = 1; i <= total_reference; i++) {
    var referenceFileName = refClipName + " " + "("+ i + ")" + ".mp4";
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



var audioClip = findClipByName("audio.mp3");
if (audioClip) {
    audioTrack1.overwriteClip(audioClip, audio_start);
}

app.project.sequences[0].audioTracks[0].setMute(1);
app.project.sequences[0].audioTracks[2].setMute(1);
app.project.sequences[0].audioTracks[3].setMute(1);

for (var i = 0; i < total_reference; i++) {
    var referenceName = refClipName + " " + "(" + (i + 1) + ")" + ".mp4";
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


var seq = project.activeSequence;
app.encoder.launchEncoder();
app.encoder.encodeSequence(seq, outputVid, myPreset, 0, 1);
app.encoder.startBatch();









