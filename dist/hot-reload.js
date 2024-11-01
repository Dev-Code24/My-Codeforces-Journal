// public/hot-reload.js

const filesInDirectory = (dir) =>
    new Promise((resolve) =>
      dir.createReader().readEntries((entries) =>
        Promise.all(
          entries
            .filter((e) => e.name[0] !== ".")
            .map((e) =>
              e.isDirectory
                ? filesInDirectory(e)
                : new Promise((resolve) => e.file(resolve))
            )
        )
          .then((files) => [].concat(...files))
          .then(resolve)
      )
    );
  
  const timestampForFilesInDirectory = (dir) =>
    filesInDirectory(dir).then((files) =>
      files.map((f) => f.name + f.lastModifiedDate).join()
    );
  
  const reload = () => {
    chrome.runtime.reload();
  };
  
  const watchChanges = (dir, lastTimestamp) => {
    timestampForFilesInDirectory(dir).then((timestamp) => {
      if (!lastTimestamp || lastTimestamp === timestamp) {
        setTimeout(() => watchChanges(dir, timestamp), 1000); 
      } else {
        reload();
      }
    });
  };
  
  // Listen for file changes in the extension directory
  chrome.management.getSelf((self) => {
    if (self.installType === "development") {
      chrome.runtime.getPackageDirectoryEntry((dir) => watchChanges(dir));
    }
  });
  