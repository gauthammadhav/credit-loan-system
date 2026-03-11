import kagglehub
import os
import shutil

def main():
    print("Downloading dataset...")
    path = kagglehub.dataset_download("altruistdelhite04/loan-prediction-problem-dataset")
    print("Path to dataset files:", path)
    
    files = os.listdir(path)
    print("Files in dataset:", files)
    
    for file in files:
        if file.endswith('.csv'):
            source = os.path.join(path, file)
            dest = os.path.join(os.path.dirname(os.path.abspath(__file__)), file)
            print(f"Copying {source} to {dest}")
            shutil.copy(source, dest)
            
if __name__ == "__main__":
    main()
