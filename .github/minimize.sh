#   Minifier Script
#   IMPORTANT - this script needs permission to run! Run the command
#   $ git update-index --chmod=+x ./.github/minimize.sh
#   from the top directory, and push the change in a commit.
#   This must be done for any bash script that is created or renamed
#   on a Windows machine in order to run it in a GitHub Action.
#   Source: https://aileenrae.co.uk/blog/github-actions-shell-script-permission-denied-error/

npm install uglify-js -g
npm install html-minifier-terser -g
FILES="src/"

#   Make dist/ directory if it doesn't already exist
mkdir -p "dist"

#   Make subdirectories from src/ into dist/ (preserve subdirectory structure)
find $FILES -type d ! -name "src" | while read fname
    do
        echo "directory: ${fname}"
        mkdir dist/${fname#src/}
    done

#find $FILES -type f -name "*.js" -or -name "*.css" -or -name "*.html" | while read fname

#   Minify javascript files in src/ using uglify-js
find $FILES -type f -name "*.js" | while read fname
    do
        #echo ${fname}
        out="$(basename ${fname})"
        #echo $out
        #echo ${fname#src/}
        echo "Minimizing ${fname}..."
        # minify ${fname} > dist/${fname}
        #minify $out > dist/$out
        touch dist/${fname#src/}
        uglifyjs --compress --mangle -- ${fname} > dist/${fname#src/}
    done

#   Minify HTML and CSS files in src/ using html-minifier-terser
find $FILES -type f -name "*.html" -or -name "*.css" | while read fname
    do
        echo "Minimizing ${fname}..."
        touch dist/${fname#src/}
        html-minifier-terser --collapse-whitespace --remove-comments --minify-js true ${fname} > dist/${fname#src/}
    done

#   Copy all other files from src/ unchanged into dist/
find $FILES -type f ! \( -name "*.js" -or -name "*.html" -or -name "*.css" \) | while read fname
    do
        echo "Copying ${fname} without minimizing..."
        cp "$fname" dist/${fname#src/}
    done

#   Copy 
#cp -r src/assets dist