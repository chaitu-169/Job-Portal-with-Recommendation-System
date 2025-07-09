import streamlit as st
import pickle
import re
import nltk
import os

nltk.download('punkt')
nltk.download('stopwords')



# Get absolute paths
BASE_DIR = os.path.dirname(__file__)
clf_path = os.path.join(BASE_DIR, 'clf.pkl')
tfidf_path = os.path.join(BASE_DIR, 'tfidf.pkl')
with open(clf_path, 'rb') as f:
    clf = pickle.load(f)

with open(tfidf_path, 'rb') as f:
    tfidf = pickle.load(f)

def clean_resume(txt):
    cleanText = re.sub(r'http\S+\s', ' ', txt)  # Raw string to avoid warnings
    cleanText = re.sub(r'RT|cc', ' ', cleanText)  # No escape sequences
    cleanText = re.sub(r'#\S+\s', ' ', cleanText)  # Raw string
    cleanText = re.sub(r'@\S+', '  ', cleanText)  # Raw string
    cleanText = re.sub(r'[%s]' % re.escape(r"""!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"""), ' ', cleanText)  # Fix warning here
    cleanText = re.sub(r'[^\x00-\x7f]', ' ', cleanText)  # Raw string
    cleanText = re.sub(r'\s+', ' ', cleanText)  # Raw string
    return cleanText
# web app
def main():
    st.title("Job Recommendation App")
    uploaded_file = st.file_uploader('Upload Resume', type=['txt','pdf'])

    if uploaded_file is not None:
        try:
            resume_bytes = uploaded_file.read()
            resume_text = resume_bytes.decode('utf-8')
        except UnicodeDecodeError:
            # If UTF-8 decoding fails, try decoding with 'latin-1'
            resume_text = resume_bytes.decode('latin-1')

        cleaned_resume = clean_resume(resume_text)
        input_features = tfidf.transform([cleaned_resume])
        prediction_id = clf.predict(input_features)[0]
        st.write(prediction_id)

        # Map category ID to category name
        category_mapping = {
            15: "Java Developer",
            23: "Testing",
            8: "DevOps Engineer",
            20: "Python Developer",
            24: "Web Designing",
            12: "HR",
            13: "Hadoop",
            3: "Blockchain",
            10: "ETL Developer",
            18: "Operations Manager",
            6: "Data Science",
            22: "Sales",
            16: "Mechanical Engineer",
            1: "Arts",
            7: "Database",
            11: "Electrical Engineering",
            14: "Health and fitness",
            19: "PMO",
            4: "Business Analyst",
            9: "DotNet Developer",
            2: "Automation Testing",
            17: "Network Security Engineer",
            21: "SAP Developer",
            5: "Civil Engineer",
            0: "Advocate",
        }

        category_name = category_mapping.get(prediction_id, "Unknown")

        st.write("Predicted Category:", category_name)



# python main
if __name__ == "__main__":
    main()
