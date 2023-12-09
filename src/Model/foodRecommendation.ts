
export interface FoodRecommendation {
    foodFamily:           FoodFamily[];
    foodType:             Food;
    imageId:              number;
    model_versions:       ModelVersions;
    occasion:             string;
    occasion_info:        OccasionInfo;
    processed_image_size: ProcessedImageSize;
    segmentation_results: SegmentationResult[];
}

export interface FoodFamily {
    id:   number;
    name: string;
    prob: number;
}

export interface Food {
    id:   number;
    name: string;
}

export interface ModelVersions {
    drinks:       string;
    foodType:     string;
    foodgroups:   string;
    foodrec:      string;
    ingredients:  string;
    ontology:     string;
    segmentation: string;
}

export interface OccasionInfo {
    id:          null;
    translation: string;
}

export interface ProcessedImageSize {
    height: number;
    width:  number;
}

export interface SegmentationResult {
    center:              Center;
    contained_bbox:      ContainedBbox;
    food_item_position:  number;
    polygon:             number[];
    recognition_results: RecognitionResult[];
}

export interface Center {
    x: number;
    y: number;
}

export interface ContainedBbox {
    h: number;
    w: number;
    x: number;
    y: number;
}

export interface RecognitionResult {
    foodFamily:  Food[];
    foodType:    Food;
    id:          number;
    name:        string;
    prob:        number;
    subclasses?: RecognitionResult[];
}


export interface DishResult {
    from:   number;
    to:     number;
    count:  number;
    _links: Links;
    hits:   Hit[];
}

export interface Links {
    self: Next;
    next: Next;
}

export interface Next {
    href:  string;
    title: string;
}

export interface Hit {
    recipe: Recipe;
    _links: Links;
}

export interface Recipe {
    uri:               string;
    label:             string;
    image:             string;
    images:            Images;
    source:            string;
    url:               string;
    shareAs:           string;
    yield:             number;
    dietLabels:        string[];
    healthLabels:      string[];
    cautions:          string[];
    ingredientLines:   string[];
    ingredients:       Ingredient[];
    calories:          number;
    glycemicIndex:     number;
    totalCO2Emissions: number;
    co2EmissionsClass: string;
    totalWeight:       number;
    cuisineType:       string[];
    mealType:          string[];
    dishType:          string[];
    instructions:      string[];
    tags:              string[];
    externalId:        string;
    totalNutrients:    TotalDaily;
    totalDaily:        TotalDaily;
    digest:            Digest[];
}

export interface Digest {
    label:        string;
    tag:          string;
    schemaOrgTag: string;
    total:        number;
    hasRDI:       boolean;
    daily:        number;
    unit:         string;
    sub:          TotalDaily;
}

export interface TotalDaily {
}

export interface Images {
    THUMBNAIL: Large;
    SMALL:     Large;
    REGULAR:   Large;
    LARGE:     Large;
}

export interface Large {
    url:    string;
    width:  number;
    height: number;
}

export interface Ingredient {
    text:     string;
    quantity: number;
    measure:  string;
    food:     string;
    weight:   number;
    foodId:   string;
}