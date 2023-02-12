export const mainPort = +env.PORT
export const renderPort = env.NODE_ENV === 'development' ? mainPort + 1 : mainPort
