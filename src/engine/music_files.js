/**
 * WRITTEN BY tools/master-music.mjs - do not edit by hand; run
 * `npm run music:master` (or `-- --cue=<id>` for one piece).
 *
 * The file names of the house band under MUSIC_DIR and what the tool
 * measured on them:
 *
 *   stereo   every piece, Opus 96 kbit/s
 *   quad     a layered piece only: bed on channels 1/2, rhythm on 3/4
 *   lufs     integrated loudness of the stereo file as it ships
 *   floor    LU lost with the rhythm at its floor (layered pieces)
 *   peak     sample peak before encoding, dBFS
 *   seconds  the length after cutting
 *
 * The week suite holds this table against docs/audio/music/ and the
 * loudness against TARGET_LUFS - nobody types these numbers.
 */
export const MUSIC_DIR = 'audio/music/';

export const MUSIC_PROBE = 'probe.quad.a89be985.opus';

export const MUSIC_FILES = {
    morning_1: { stereo: 'morning_1.160475c5.opus', quad: 'morning_1.quad.7acfc6c7.opus', lufs: -21.9, floor: 1.9, peak: -5.9, seconds: 179.89 },
    morning_2: { stereo: 'morning_2.98b87ed9.opus', quad: 'morning_2.quad.3117af0c.opus', lufs: -21.9, floor: 1.3, peak: -9.7, seconds: 170.99 },
    day_a: { stereo: 'day_a.7762b274.opus', quad: 'day_a.quad.302064ea.opus', lufs: -21.9, floor: 1.5, peak: -9.9, seconds: 60.00 },
    day_1: { stereo: 'day_1.8aa311d3.opus', quad: 'day_1.quad.a327b6b9.opus', lufs: -21.9, floor: 1.8, peak: -8.4, seconds: 178.88 },
    day_2: { stereo: 'day_2.8967c123.opus', quad: 'day_2.quad.df380f6e.opus', lufs: -21.9, floor: 1.8, peak: -5.9, seconds: 171.25 },
    day_3: { stereo: 'day_3.b7f5ba4a.opus', quad: 'day_3.quad.247bf277.opus', lufs: -21.9, floor: 1.1, peak: -8.2, seconds: 175.00 },
    day_4: { stereo: 'day_4.cd4882eb.opus', quad: 'day_4.quad.c0984387.opus', lufs: -21.9, floor: 1.1, peak: -8.4, seconds: 179.87 },
    lunch_1: { stereo: 'lunch_1.a8e0c4db.opus', quad: 'lunch_1.quad.b2659d10.opus', lufs: -21.9, floor: 2.0, peak: -10.2, seconds: 179.84 },
    afternoon_1: { stereo: 'afternoon_1.8c96783f.opus', quad: 'afternoon_1.quad.b4fdb75d.opus', lufs: -21.9, floor: 1.2, peak: -5.9, seconds: 179.98 },
    afternoon_2: { stereo: 'afternoon_2.5a22d361.opus', quad: 'afternoon_2.quad.d0b3a91c.opus', lufs: -21.9, floor: 1.3, peak: -8.9, seconds: 178.73 },
    tense_1: { stereo: 'tense_1.d98d0f2a.opus', quad: 'tense_1.quad.d589f3d4.opus', lufs: -21.9, floor: 0.8, peak: -7.0, seconds: 149.88 },
    tense_2: { stereo: 'tense_2.32ce42d0.opus', quad: 'tense_2.quad.7668c075.opus', lufs: -21.9, floor: 1.7, peak: -8.4, seconds: 148.09 },
    tense_3: { stereo: 'tense_3.da3d5027.opus', quad: 'tense_3.quad.b28e6c38.opus', lufs: -21.9, floor: 1.4, peak: -9.8, seconds: 150.00 },
    emergency_a: { stereo: 'emergency_a.387390ff.opus', lufs: -18.9, peak: -3.7, seconds: 59.78 },
    emergency_2: { stereo: 'emergency_2.0e04c4dc.opus', lufs: -18.9, peak: -8.3, seconds: 123.35 },
    emergency_3: { stereo: 'emergency_3.fc5c0788.opus', lufs: -18.9, peak: -5.8, seconds: 149.58 },
    gala_1: { stereo: 'gala_1.26d71dac.opus', lufs: -18.9, peak: -5.9, seconds: 209.64 },
    gala_2: { stereo: 'gala_2.54c4a6b3.opus', lufs: -18.9, peak: -6.6, seconds: 210.00 },
    gala_3: { stereo: 'gala_3.21fb4168.opus', lufs: -18.9, peak: -5.3, seconds: 209.53 },
};
