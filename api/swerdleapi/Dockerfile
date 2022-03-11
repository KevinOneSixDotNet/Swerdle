FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
ADD ./ /app
WORKDIR /app
EXPOSE 8080
WORKDIR /app 
ENV ASPNETCORE_URLS=http://*:8080
ENTRYPOINT [ "dotnet", "swerdleapi.dll", "--server.urls", "http://+:8080"]

# LOCAL:
# docker build . (when in directory)
# make external port map to container port on run
# 127.0.0.1:{port} in browser