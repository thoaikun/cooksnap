/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export enum Colors {
  TRANSPARENT = 'rgba(0,0,0,0)',
  BACKGROUND = "#BBC0C3",
  WHITE = "#FFFFFF",
  BLACK = '#000000',
  PRIMARY_TEXT = "#26292C",
  SECONDARY_TEXT = '#9DA3A8',
  PRIMARY = "#3DC73A",
  PRIMARY_LIGHT = '#ECF9EB',
  PRIMARY_DARK = '#2E952C',
  SUCCESS = "#28a745",
  ERROR = "#C74530",
  WARNING = '#E8DF07'
}

export enum NavigationColors {
  PRIMARY = Colors.PRIMARY,
}

/**
 * FontSize
 */
export enum FontSize {
  EXTRA_SMALL = 14,
  SMALL = 16,
  REGULAR = 20,
  LARGE = 40,
}

/**
 * Metrics Sizes
 */
const tiny = 5; // 10
const small = tiny * 2; // 10
const regular = tiny * 3; // 15
const large = regular * 2; // 30

export enum MetricsSizes {
  TINY = tiny,
  SMALL = small,
  REGULAR = regular,
  LARGE = large,
}
