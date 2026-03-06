
# 1. Check the number of arguments
# 2. Create a flag array
# 3. Append delete or dry run to the flags array depending on the input

function copyToDrive() {
  [[ $# -ne 2 ]] && echo "usage: copyToDrive <src> <dest>" && return 1

  local flags=(-av)

  print -n "Mirror destination (delete extra files)? [y/N] "
  read mirror
  case "$mirror" in
    y|Y) flags+=("--delete") ;;
  esac

  print -n "Show what will happen first (dry run)? [y/N] "
  read dry 
  case "$dry" in
    y|Y) flags+=("--dry-run") ;;
  esac

   # Expand all elements
   rsync "${flags[@]}" \
    --exclude=node_modules/ \
    --exclude=.venv/ \
    --exclude=.git/ \
    --exclude=.next/ \
    --delete\
    "$1/" "$2"

}
