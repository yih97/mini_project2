# views.py 시각화 코드
from django.shortcuts import render
from django.http import HttpResponse
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from .models import ClosedSchoolMap
import folium
from folium.plugins import MarkerCluster
import geocoder

def main_page(request):
    figure = folium.Map(location=[37.55, 126.98], zoom_start=12)
    marker_cluster_kor_marker = MarkerCluster().add_to(figure)
    popups = []

    for i in ClosedSchoolMap.objects.values():
        name = []
        year = []

        name.append(i["school_name"])
        year.append(i["closed_school_year"])

        popup_html = f"<b>{name[0]} ({year[0]}년 폐교)</b>"  # 팝업 내용 수정
        popups.append(folium.Popup(popup_html, max_width=200))

    for i in range(len(ClosedSchoolMap.objects.values())):
        lat = []
        log = []

        lat.append(ClosedSchoolMap.objects.values()[i]["latitude"])
        log.append(ClosedSchoolMap.objects.values()[i]["longitude"])

        folium.Marker(
            location=[lat[0], log[0]],
            icon=folium.Icon(color='blue'),  # 아이콘 색상 설정
            popup=popups[i] # 팝업 설정
        ).add_to(marker_cluster_kor_marker)

    context = {
        'map': figure._repr_html_()
           }

    return render(request, 'main/main.html', context)



