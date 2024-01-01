export const validateEmail = (email: string) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
}

export const getImageExtension = (uri: string | undefined) => {
    // Extract the file name from the URI
    const fileName = uri?.split('/').pop();
  
    // Extract the file extension from the file name
    const fileExtension = fileName?.split('.').pop();
  
    return fileExtension?.toLowerCase(); // Return the lowercase extension
};

export const extractIdFromUrl = (url: string) => {
    const pattern = /#recipe_(\w+)$/;
    const match = pattern.exec(url);
  
    const recipeId = match?.[0] ?? '0';
    return recipeId.replace('#', '');
}

export function debounce<T extends Function>(cb: T, wait = 300) {
    let h: any = 0;
    let callable = (...args: any) => {
        clearTimeout(h);
        h = setTimeout(() => cb(...args), wait);
    };
    return <T>(<any>callable);
}