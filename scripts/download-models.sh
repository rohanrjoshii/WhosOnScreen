#!/usr/bin/env bash
#
# WhosOnScreen – Download ONNX Models
#
# Downloads SCRFD-500M (face detection) and ArcFace MobileFaceNet (face
# embedding) into the local models/ directory. The files are verified before
# they are moved into place so an interrupted download cannot silently poison
# the build.
#
# Usage: bash scripts/download-models.sh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
MODELS_DIR="$ROOT_DIR/models"
mkdir -p "$MODELS_DIR"

SCRFD_URL="https://huggingface.co/ykk648/face_lib/resolve/10005fec5e0fec7c186e3b96318f00b4807fc70b/face_detect/scrfd_onnx/scrfd_500m_bnkps.onnx"
SCRFD_FILE="$MODELS_DIR/scrfd_500m.onnx"
SCRFD_SHA256="a3562ef62592bf387f6ef19151282ac127518e51c77696e62e0661bee95ba1ad"
SCRFD_MIN_BYTES=1000000

# InsightFace's w600k_mbf checkpoint provides the 512-d ArcFace-compatible
# embedding used by the extension. The local filename is kept stable for
# backwards compatibility with existing builds.
ARCFACE_URL="https://huggingface.co/deepghs/insightface/resolve/4e1f33d3fe0e50a0945f3a53ab94ae8977ae7ddb/buffalo_s/w600k_mbf.onnx"
ARCFACE_FILE="$MODELS_DIR/arcface_mobilefacenet.onnx"
ARCFACE_SHA256="9cc6e4a75f0e2bf0b1aed94578f144d15175f357bdc05e815e5c4a02b319eb4f"
ARCFACE_MIN_BYTES=1000000

verify_sha256() {
  local file="$1"
  local expected="$2"
  local actual
  actual="$(shasum -a 256 "$file" | awk '{print $1}')"
  [ "$actual" = "$expected" ]
}

download_model() {
  local label="$1"
  local url="$2"
  local destination="$3"
  local expected_sha="$4"
  local min_bytes="$5"

  if [ -f "$destination" ] && [ "$(wc -c < "$destination" | tr -d ' ')" -ge "$min_bytes" ] && verify_sha256 "$destination" "$expected_sha"; then
    echo "[wos] $label already present and verified, skipping."
    return
  fi

  local temp_file="${destination}.download"
  rm -f "$temp_file"
  echo "[wos] Downloading $label..."
  curl -L --fail --retry 3 --silent --show-error -o "$temp_file" "$url"
  [ "$(wc -c < "$temp_file" | tr -d ' ')" -ge "$min_bytes" ]
  verify_sha256 "$temp_file" "$expected_sha" || {
    rm -f "$temp_file"
    echo "[wos] $label checksum verification failed; refusing to install it." >&2
    return 1
  }
  mv "$temp_file" "$destination"
  echo "[wos] ✓ $label downloaded and verified."
}

echo "[wos] Downloading ONNX models to $MODELS_DIR"
download_model "SCRFD-500M face detector" "$SCRFD_URL" "$SCRFD_FILE" "$SCRFD_SHA256" "$SCRFD_MIN_BYTES"
download_model "ArcFace MobileFaceNet embedder" "$ARCFACE_URL" "$ARCFACE_FILE" "$ARCFACE_SHA256" "$ARCFACE_MIN_BYTES"

echo ""
echo "[wos] Model download complete. Run 'npm run build' to package the extension."
